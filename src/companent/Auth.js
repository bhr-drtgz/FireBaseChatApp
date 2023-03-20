import { auth, provider } from "../fireBase/FirebaseConfig"
import { signInWithPopup } from "firebase/auth";
import "../assest/index.css"

const Auth = () => {
    const singIn = ({setIsAuth}) => {
        signInWithPopup(auth, provider)
        .then(res=>{
            localStorage.setItem("token",res.user.refreshToken)
            setIsAuth(true)
        })
        .catch(err=>console.log(err))

    }
    return (
        <div className="auth">
             <h1>Chat Odası</h1>
            <p>Devam Etmek İçin Tıklayınız</p>
            <button onClick={singIn}>Google Giriş Yap</button>
        </div>
    )
}

export default Auth