import React from 'react';
import Header from './components/Header/Header';
import './App.css';

export default function App({ tab }) {
    return (
		<div className="App">
         	<Header tab={tab}/>
       	</div>
    )
}
