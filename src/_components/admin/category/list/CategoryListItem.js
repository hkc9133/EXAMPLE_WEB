import React, {useEffect} from 'react';
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import style from './CategoryListItem.module.scss'
import {Draggable, Droppable} from "react-beautiful-dnd";

const CategoryListItem = ({category, isParent, provided, selectCategory, setSelectCategory}) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = (category) => {
        const isParent = category.parentId == null;
        if (isParent) {
            setOpen(!(selectCategory?.categoryId == category.categoryId));
            setSelectCategory(selectCategory?.categoryId == category.categoryId ? null : category)
        } else {
            setSelectCategory(category)
        }
    };


    return (
        <>
            <RenderItem selectCategory={selectCategory} category={category} isParent={true} handleClick={handleClick}
                        open={open}/>
            {
                isParent && open && (
                    <Droppable droppableId={`${category.categoryId}`} type="ITEM">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {category.itemList.map((item, index) => (
                                    <Draggable key={item.categoryId} draggableId={`${item.categoryId}`} index={index}>
                                        {(provided) => (
                                            <RenderItem selectCategory={selectCategory} category={item} isParent={false}
                                                        handleClick={handleClick} provided={provided}/>
                                            // <CategoryListItem category={item} isParent={false} provided={provided} setSelectCategory={setSelectCategory}/>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                )
            }
        </>
    )
        ;
};

export default CategoryListItem;

const RenderItem = ({selectCategory, category, isParent, provided, handleClick, open}) => {

    return (
        <div className={`${style.category} ${selectCategory?.categoryId == category.categoryId ? style.selected : ''}`}
             onClick={() => {
                 handleClick(category)
             }}
             ref={provided?.innerRef} {...provided?.draggableProps} {...provided?.dragHandleProps}
        >
            {isParent && (
                <div className={style.folder}>
                    {open ? <FolderOpenIcon color={'warning'}/> : <FolderIcon color={'warning'}/>}
                </div>
            )}
            <div className={`${style.item} ${!isParent && style.child}`}>
                {category.categoryName}
            </div>
            {isParent && (
                <div className={style.arrow}>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </div>
            )}
        </div>
    )

}
