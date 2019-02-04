
-- Do not lock anything and do not get held up by any locks.
set transaction isolation level read uncommitted;

-- Quickly get row counts for all tables in a specific schema.
select  OBJECT_SCHEMA_NAME(p.object_id) AS [Schema]
,       OBJECT_NAME(p.object_id) AS [Table]
,       i.name AS [Index]
,       p.partition_number
,       p.rows AS [Row Count]
,       i.type_desc AS [Index Type]
from    sys.partitions p
join    sys.indexes i ON p.object_id = i.object_id AND p.index_id = i.index_id
where   OBJECT_SCHEMA_NAME(p.object_id) = 'MySchemaName'
order by [Schema], [Table], [Index]