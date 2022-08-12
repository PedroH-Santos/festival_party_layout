import { useState } from "react";

export interface Filters {
    name: string;
    value: string;
    type: string;
}


export function useFilter(){
    const [filters,setFilters] = useState<Filters[]>([]);


   function insertNewFilter(newFilters: Filters[]){
            try {
                setFilters([...filters,...newFilters]);
            }catch(err) {
            }

    } 

    function changeValueFilter(name: string, value: string){
        
        const newFilters = filters.map((filter) => {
            if(filter.name == name){  
                return { ...filter,value: value } ;
            }
            return filter;
        });


        setFilters(newFilters);
        }

    function getUrlSearch(){
        let urlSearch = '';
        filters.map((filter) => {
            if(filter.value != ''){
                urlSearch += `${filter.name}=${filter.value}&`;
            }
        })
        return urlSearch;
    }


    return {
        filters,
        insertNewFilter,
        changeValueFilter,
        getUrlSearch
    }


}