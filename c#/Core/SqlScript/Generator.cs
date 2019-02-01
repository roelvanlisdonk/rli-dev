using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SqlScript
{
    public class Generator
    {

        

        /**
        * Note before you can use this test, you must first set the environment variable "test_dev_db_1", to a sql server database connection string.
        * 
        * In powershell run:
        * [Environment]::SetEnvironmentVariable("test_dev_db_1", "Server=127.0.0.1;Database=mydb;persist security info=True;user id=myUser;password=*****;", "Machine")
        * 
        */
        public async Task<bool> GenerateViewScriptsBasedOnTable() {

            string commandText = @"
            
            declare @ImSchemaName sysname = 'IM';
            declare @VmNameLike sysname = 'vw_pbi_%';

            declare @Scripts table (
                Id int identity(1,1)
            ,    ObjectId bigint not null
            ,	ViewName sysname not null
            ,	FullViewName sysname not null
            ,   DwhTableName sysname not null
            ,   [Columns] nvarchar(max) null
            ,   Content nvarchar(max) null
            );


            insert into @Scripts (ObjectId, ViewName, FullViewName, DwhTableName)
            select	v.[object_id] as ObjectId
            ,		v.[name] as ViewName
            ,		s.[name] + '.' + v.[name] as FullViewName
            ,		'DWH.' + v.[name] as DwhTableName
            from    sys.views v
            join    sys.schemas s on v.[schema_id] = s.[schema_id]
            where	s.[name] = @ImSchemaName
            and		v.[name] like @VmNameLike;

            update	@Scripts
            set		[Columns] = (
                select  string_agg(quotename(c.[name]), ', ')
                from	sys.columns c
                where   c.[object_id] = s.ObjectId
            )
            from @Scripts s;

            declare @crLf nvarchar(10) = char(13) + char(10); 

            update	@Scripts
            set		Content = 'create or alter view ' + s.FullViewName + ' as' + @crLf
            + ' select ' + s.[Columns] + ' from ' + s.DwhTableName + ';' + @crLf
            from	@Scripts s

            select Id, FullViewName, Content from @Scripts;

            ";

            // Get "create or alter view scripts" from the database.  
            List<Script> scripts = null;
            string connectionString = Environment.GetEnvironmentVariable("test_dev_db_1", EnvironmentVariableTarget.Machine);
            using(var context = new Context(connectionString)) {
                scripts = await context.Scripts.FromSql(commandText).ToListAsync<Script>();
            }
            
            // Create export folder or clear it.
            string folder = @"C:\Temp\Views";
            if(Directory.Exists(folder)) {
                Directory.Delete(folder, true);
            }
            Directory.CreateDirectory(folder);

            foreach(Script script in scripts) {
                File.WriteAllText(Path.Join(folder, script.FullViewName) + ".sql", script.Content);
            }

            return true;
        }

        /**
        * Note before you can use this test, you must first set the environment variable "test_dev_db_1", to a sql server database connection string.
        * 
        * In powershell run:
        * [Environment]::SetEnvironmentVariable("test_dev_db_1", "Server=127.0.0.1;Database=mydb;persist security info=True;user id=myUser;password=*****;", "Machine")
        * 
        */
        public async Task<bool> GenerateViewScriptsBasedOnViewDefinition() {

            string commandText = @"
            
            declare @ImSchemaName sysname = 'IM';
            declare @VmNameLike sysname = 'vw_pbi_%';

            declare @Scripts table (
                Id int identity(1,1)
            ,    ObjectId bigint not null
            ,	ViewName sysname not null
            ,	FullViewName sysname not null
            ,   DwhTableName sysname not null
            ,   [Columns] nvarchar(max) null
            ,   Content nvarchar(max) null
            );


            insert into @Scripts (ObjectId, ViewName, FullViewName, DwhTableName)
            select	v.[object_id] as ObjectId
            ,		v.[name] as ViewName
            ,		s.[name] + '.' + v.[name] as FullViewName
            ,		'DWH.' + v.[name] as DwhTableName
            from    sys.views v
            join    sys.schemas s on v.[schema_id] = s.[schema_id]
            where	s.[name] = @ImSchemaName
            and		v.[name] like @VmNameLike;

            update	@Scripts
            set		[Columns] = (
                select  string_agg(quotename(c.[name]), ', ')
                from	sys.columns c
                where   c.[object_id] = s.ObjectId
            )
            from @Scripts s;

            declare @crLf nvarchar(10) = char(13) + char(10); 

            update	@Scripts
            set		Content = (
                select	trim(m.[definition])
                from	sys.objects o
                join	sys.sql_modules m on m.[object_id] = o.[object_id]
                where	o.[object_id] = object_id(s.FullViewName)
                and		o.[type]      = 'V'
            )
            from	@Scripts s

            select Id, FullViewName, Content from @Scripts;

            ";

            // Get "create or alter view scripts" from the database.  
            List<Script> scripts = null;
            string connectionString = Environment.GetEnvironmentVariable("test_dev_db_1", EnvironmentVariableTarget.Machine);
            using(var context = new Context(connectionString)) {
                scripts = await context.Scripts.FromSql(commandText).ToListAsync<Script>();
            }
            
            // Create export folder or clear it.
            string folder = @"C:\Temp\Views";
            if(Directory.Exists(folder)) {
                Directory.Delete(folder, true);
            }
            Directory.CreateDirectory(folder);

            foreach(Script script in scripts) {
                string content = script.Content.Trim().TrimStart(Environment.NewLine.ToCharArray());
                content = Regex.Replace(content, @"\s*CREATE\s*VIEW\s", "create or alter view ", RegexOptions.IgnoreCase);
                content = content.Replace("'", "''");
                content = Environment.NewLine 
                + "if(DB_NAME() not like '%-dev-%')" + Environment.NewLine 
                + "begin" + Environment.NewLine
                + "     declare @sql nvarchar(max) = '" + Environment.NewLine
                + content + Environment.NewLine
                + "';" + Environment.NewLine
                + "     exec sp_executesql @sql;" + Environment.NewLine
                + "end" + Environment.NewLine 
                + "go" + Environment.NewLine;
                File.WriteAllText(Path.Join(folder, script.FullViewName) + ".sql", content);
            }

            return true;
        }
    }
}