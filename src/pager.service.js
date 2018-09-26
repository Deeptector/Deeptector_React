import React from 'react';

class PagerService extends React.Component{
    getPager(totalItems, currentPage, pageSize) {
        
        let totalPages = Math.ceil(totalItems / pageSize);

        if (currentPage < 1) { 
            currentPage = 1; 
        } else if (currentPage > totalPages) { 
            currentPage = totalPages; 
        }
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let arr = [currentPage, startIndex, endIndex];
        return arr;
    }
}

export default PagerService;