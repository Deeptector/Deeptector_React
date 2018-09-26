import React from 'react';

class PagerService extends React.Component{
    getPager(totalItems, currentPage, pageSize) {
        //totalItems을 받아 페이지 수 결정
        let totalPages = Math.ceil(totalItems / pageSize);
        //화살표를 눌렀을 때 페이지 결정
        if (currentPage < 1) { 
            currentPage = 1; 
        } else if (currentPage > totalPages) { 
            currentPage = totalPages; 
        }
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        //페이징을 위한 변수 return
        let arr = [currentPage, startIndex, endIndex];
        return arr;
    }
}

export default PagerService;