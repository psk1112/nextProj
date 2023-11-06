import connMariaDB from "@/util/connMariaDB";

export default async function List(req, res){   
    try {
        if(req.method == 'POST'){
            const connection = await connMariaDB();
            connection.promise().execute(`select * 
                                            from(select p.product_seq 
                                                        , p.kind
                                                        , p.title
                                                        , p.note 
                                                        , p.content 
                                                        , p.price 
                                                        , p.created_at  
                                                        , f.file_seq 
                                                        , f.original_file_name
                                                        , f.file_path 
                                                        , f.new_file_name 
                                                        , ROW_NUMBER() OVER (PARTITION BY p.product_seq ORDER BY f.file_seq) as rn
                                                    from product p 
                                                left join product_image pi2 on p.product_seq = pi2.product_seq 
                                                left join file f on f.file_seq = pi2.file_seq
                                                    where kind =?
                                                    )as pp
                                            where 1=1
                                            and pp.rn = 1`, [req.body.id])
            .then(([rows, fields]) => {
                res.status(200).json(rows);
                connection.end();
            })
            .catch(error => {
                res.status(500).json({ error: '쿼리 실행 중 에러 발생' });
            });
        } else {
            res.status(400).json({ error: '잘못된 메소드' });
        }
    } catch (error) {
        res.status(500).json({ error: '쿼리 실행 중 에러 발생' });
    }
}