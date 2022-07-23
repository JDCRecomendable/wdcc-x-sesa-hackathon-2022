import { height } from '@mui/system';
import React from 'react';

// class SideNav extends React.Component {
//     render() {
//         return (
//             const StyledSideNav = styled.div
//             position: 'fixed';     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
//             height: '100%';
//             width: 75px;     /* Set the width of the sidebar */
//             z-index: 1;      /* Stay on top of everything */
//             top: 3.4em;      /* Stay at the top */
//             background-color: #222; /* Black */
//             overflow-x: hidden;     /* Disable horizontal scroll */
//             padding-top: 10px;
          
//         );
//       }
// }

export default class Sidebar extends React.Component {
  render() {
    return (
            <div style={{ position: 'fixed', width: '300px', height: '100%',zIndex: '1', top: '3.4em', backgroundColor: '#222', overflowX: 'hidden', marginTop: '17px'}}>
            </div>
    );
  }
}