import React from 'react';

const GenerateMass = (massive, active) => {

        let finishList = [];
        massive.forEach((elem_kategory)=>{

            if(active=== elem_kategory.id){ //находим нужнгый массив по текствому id

                finishList=elem_kategory.products;

            }
        })
        return finishList;

};

export default GenerateMass;