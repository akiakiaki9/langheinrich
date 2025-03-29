import React from 'react'
import LayoutComp from './LayoutComp'
import { Link } from 'react-router-dom'
import { GoDotFill } from 'react-icons/go'

export default function LayoutMain() {

    return (
        <div>
            <div className='pagename'>
                <div className="pagename-blok">
                    <div>
                        <h1>Store</h1>
                    </div>
                    <div>
                        <Link to='/home'><p className='pagename-blok__p-1'>Home</p></Link>
                        <GoDotFill className='pagename-icon' />
                        <p className='pagename-blok__p-2'>Store</p>
                    </div>
                </div>
            </div>
            <LayoutComp />
        </div>
    )
};