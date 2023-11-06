import connMariaDB from "@/util/connMariaDB";

export default async function Detail (req, res){
    try {
        if(req.method == 'POST'){
            const connection = await connMariaDB();
            const productQuery = connection.promise().execute(`select p.product_seq 
                                                                    , p.kind
                                                                    , p.title
                                                                    , p.note 
                                                                    , p.content 
                                                                    , p.price 
                                                                    , p.created_at  
                                                                from product p 
                                                                where p.product_seq = ?`, [req.body.id])

            const fileQuery = connection.promise().execute(`select pi.product_seq 
                                                                , f.file_seq 
                                                                , f.original_file_name 
                                                                , f.file_path 
                                                                , f.new_file_name 
                                                                , row_number () over (partition by pi.product_seq order by f.file_seq) as rn
                                                            from product_image pi 
                                                            left join file f on f.file_seq = pi.file_seq  
                                                            where pi.product_seq = ?`, [req.body.id])

            Promise.all([productQuery, fileQuery])
                .then(([productRows, fileRows]) => {
                    const productData = productRows[0][0]; // Assuming product is a single row
                    const fileData = fileRows[0];

                    res.status(200).json({ productData, fileData });
                    connection.end();
                })
                .catch(error => {
                    res.status(500).json({ error: '쿼리 실행 중 에러 발생' });
                    connection.end();
                });
        } else {
            res.status(400).json({ error: '잘못된 메소드' });
        }
    } catch (error) {
        res.status(500).json({ error: '쿼리 실행 중 에러 발생' });
    }
}