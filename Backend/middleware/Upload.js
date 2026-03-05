import multer from "multer"

const storage=multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,"uploads/")
    },
    filename:function(req,file,cd){
        cd(null,Date.now()+"-"+file.originalname)
    }
})
const upload=multer({storage:storage})
export default upload