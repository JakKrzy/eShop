import React from 'react'
import List from '../List/List'

// For now it's in memory
// Once we make an API this list will be fetched from backend 
const inMemoryItemList = [
	{
		name: "Bike",
		image: "https://cdn.pixabay.com/photo/2013/07/13/13/46/bicycle-161524_640.png",
		description:
			"A great bicycle for a great price! Don't miss out on this occasion, a bicycle! It has two wheels, a seat and much more!"
			+"\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra egestas elit, vel sagittis arcu interdum eget. Ut condimentum porttitor felis ut euismod. Proin nec felis vitae erat bibendum ornare at sed massa. Nam eleifend aliquam mi et pretium. Pellentesque vitae libero urna. Phasellus auctor lorem felis. Aenean nec ipsum aliquet, pulvinar justo sed, lobortis nunc. Quisque viverra, nunc ac gravida tincidunt, elit sapien porttitor ante, vel egestas ante nisl sit amet enim. Quisque aliquam ipsum ex, ullamcorper euismod turpis tincidunt quis. Integer interdum sodales ex, sed semper nulla consectetur eget. Morbi orci nulla, dapibus quis leo eget, egestas tristique nisi."
			+"\nNullam cursus vel lectus id semper. Morbi libero turpis, convallis at nulla a, lobortis euismod dolor. Maecenas turpis nisi, tristique at bibendum ac, posuere at lectus. Quisque dictum vehicula turpis a lacinia. Suspendisse semper tortor tincidunt turpis accumsan, vel ornare turpis ornare. Integer volutpat suscipit sapien ac facilisis. Suspendisse ac commodo arcu. Vestibulum condimentum mauris ut eros sodales scelerisque. Nam non commodo orci. Praesent vitae semper odio, eu dictum odio."		
			+"\nPraesent arcu ex, efficitur at fringilla quis, molestie ac augue. Maecenas et pulvinar ipsum. Ut elementum velit dignissim vulputate aliquet. Donec quis lacus ligula. Etiam condimentum odio sit amet est luctus elementum. Aenean vestibulum lacus at tortor pharetra, at fermentum diam tempus. Aliquam venenatis mauris erat, ac tincidunt velit tempor nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus sit amet ultricies massa. Suspendisse viverra convallis purus, non placerat magna pretium sed. Curabitur pretium convallis nulla id molestie. Sed tempor porta nisl ut semper.",
		price: 368.99,
		stock: 12
	},
	{
		name: "Skateboard",
		image: "https://img.freepik.com/free-vector/realistic-skate-board-set-with-blank-background-isolated-top-bottom-views-wooden-skateboard-vector-illustration_1284-83884.jpg",
		description:
			"A great skateboard for a great price! Don't miss out on this occasion, a skateboard! It has four wheels, no seat and much more!",
		price: 59.99,
		stock: 56
	},
	{
		name: "Scooter",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffR6CD4exddKgBmeqgexgUxkzgRCw1Er5mQ&usqp=CAU",
		description:
			"A great scooter for a great price! Don't miss out on this occasion, a scooter! It has two wheels, no seat and much less!",
		price: 79.99,
		stock: 121
	}
]

export default function Catalogue({ onAddToCart }) {
    return (
        <List items={inMemoryItemList} itemButtonOnClick={onAddToCart} itemButtonArg="item" itemButtonContent="Add to cart"/>
    )
}