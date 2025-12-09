const asyncHandler = (fn) => (req,res,next) =>{
    Promise.resolve(fn(req,res,next)).catch(next);
}
// const fn = () =>{

// }

export default asyncHandler;