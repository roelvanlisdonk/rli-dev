
-- Select views that don't reference other views.
select
		s.[name]
,		v.[name]
from	sys.views v
join	sys.schemas s on v.schema_id = s.schema_id
where	v.object_id not in (
	select distinct
				r.referenced_id
	from		sys.dm_sql_referenced_entities (s.[name] +  '.' + v.[name], 'OBJECT') r
	join		sys.objects o on r.referenced_id = o.object_id
	where		o.[type] = 'V'
)
order by	s.[name], v.[name]