import { useState } from 'react';

export default function Card(props: any) {
  const dragStart = (e: any) => {
    e.preventDefault();
    const img = new Image();
    console.log(e.dataTransfer);
    const posX = e.clientX;
    const posY = e.clientY;
    const originalX = e.target.offsetLeft;
    const originalY = e.target.offsetTop;
  }

  const drag = (e: any) => {
    e.target.style.left = '10px';
    e.target.style.top = '10px';
  }
  return (
    <div className="card-box" draggable onDragStart={dragStart} onClick={dragStart}>
      <div className="card-detail">
        <span>
          {props.card.title}
        </span>
      </div>
    </div>
  )
}