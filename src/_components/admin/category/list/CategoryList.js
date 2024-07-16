'use client'

import React, {useState} from 'react';
import {Card, Grid} from "@mui/material";
import CategoryListItem from "@/components/admin/category/list/CategoryListItem";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


const CategoryList = ({data, selectCategory, setSelectCategory, handleMove}) => {

    const onDragEnd = (result) => {
        const {source, destination} = result;

        console.log('>>> source', source);
        console.log('>>> destination', destination);

        // 드래그 앤 드롭이 끝나지 않은 경우
        if (!destination) {
            return;
        }

        // 같은 droppable 안에서의 순서 변경
        if (source.droppableId === destination.droppableId) {
            return;
        } else { // 다른 droppable로 이동

            const sourceItemList = Array.from(data.find(item => item.categoryId === parseInt(source.droppableId)).itemList);

            const category = {
                categoryId: sourceItemList[source.index].categoryId,
                parentId: parseInt(destination.droppableId)
            }
            handleMove(category)
        }
    };


    return (
        <Grid item xs={4}>
            <Card sx={{p: 2,height:300,overflowY:'scroll'}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="root" type="CATEGORY">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {data.map((category) => (
                                    <React.Fragment key={category.categoryId}>
                                        <CategoryListItem category={category} isParent={true}
                                                          selectCategory={selectCategory}
                                                          setSelectCategory={setSelectCategory}/>
                                    </React.Fragment>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Card>
        </Grid>);
};

export default CategoryList;
