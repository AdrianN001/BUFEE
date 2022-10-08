import _ from "lodash"

function li_with_amount(lista: string[]) : string[]
{
    const occur = _.countBy(lista);

    let new_list: string[]  = []; 

    for (const elem in occur)
    {
        if (elem !== "" )
        {
            new_list.push(`${occur[elem]} db. ${elem.replace("\n","")}`)
        }
    }
    
    return new_list;
}

const format_class = (class_:string): string => {
    
    try{
        const szak = class_[class_.length - 1];
        const evfolyam = class_[0] === "9" ?  class_[0] : class_.slice(0,2)

        return (`${evfolyam}. ${szak}`)
    }catch(err)
    {
        return "..."
    }
}
    

export {li_with_amount, format_class}