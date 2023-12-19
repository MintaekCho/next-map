import React from 'react';

export default function StoreDetailsPage({params: {id}}: {params: {id: number}}) {
    console.log(id)
    return (
        <div>
            맛집 상세 {id}
        </div>
    );
}

