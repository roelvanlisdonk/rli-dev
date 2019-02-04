
# Code snippet

<pre>
<code>
-- Select views that reference other views.
select distinct
			s.[name]
,			v.[name]
,			r.referenced_schema_name
,			r.referenced_entity_name 
from		sys.views v
join		sys.schemas s on v.schema_id = s.schema_id
cross apply sys.dm_sql_referenced_entities (s.[name] +  '.' + v.[name], 'OBJECT') r
join		sys.objects o on r.referenced_id = o.object_id
where		o.[type] = 'V'
order by	s.[name], v.[name]
</code>
</pre>