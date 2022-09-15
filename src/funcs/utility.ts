import _ from "lodash"

function li_with_amount(lista: string[]) : string[]
{
    const occur = _.countBy(lista);

    let new_list: string[]  = []; 

    for (const elem in occur)
    {
        if (elem !== "")
        {
            new_list.push(`${occur[elem]} db. ${elem.replace("\n","")}`)
        }
    }
    
    return new_list;
}

export {li_with_amount}