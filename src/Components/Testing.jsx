
// const SimpleModalTest = ({ isOpen, onClose }) => {
//   if (!isOpen) {
//     return null;
//   }


//   const backdropStyle = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     zIndex: 10000, 
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   };

//   const contentStyle = {
//     background: 'white',
//     padding: '40px',
//     borderRadius: '10px',
//   };

//   return (
//     <div style={backdropStyle} onClick={onClose}>
//       <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
//         <h2>This is the test modal.</h2>
//         <p>If you can see this, the button and state are working!</p>
//         <button onClick={onClose}>Close Me</button>
//       </div>
//     </div>
//   );
// };

// export default SimpleModalTest;