SELECT *, 
    CASE 
        WHEN branch_name = 'Белгородэнерго' THEN 'Белгород'
        WHEN branch_name = 'Брянскэнерго' THEN 'Брянск'
        ELSE branch_name  
    END AS branch_name_short
FROM dm_bi.d_res
;
