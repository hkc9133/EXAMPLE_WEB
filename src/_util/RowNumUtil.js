export const makeRowNum = ({total,pageNum,pageSize}) =>{

    return total > 0 ? total - ((pageNum - 1) * pageSize) : 1

}

