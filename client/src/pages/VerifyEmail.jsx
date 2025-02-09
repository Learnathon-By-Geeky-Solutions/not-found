import { useEffect, useState } from "react"
import { verifyEmail } from "../lib/api"
import { useParams } from "react-router"


const VerifyEmail = () => {
    const { code } = useParams();
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const verify = async () => {
            try {
                const res = await verifyEmail(code);
                console.log(res);
            } catch (error) {
                setIsError(true);
                console.log(error);
            }
        }
        verify();
    }, [])
  
    return (
    <div>
        {isError ? <p>Invalid link</p> : <p>Email verified</p>}
    </div>
  )
}

export default VerifyEmail