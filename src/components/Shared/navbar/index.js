import React from 'react';
function NavBar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light p-2">
            <a class="navbar-brand" href="#">Quiz</a>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <button className="btn float-end">Log out</button>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;