import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner.js";
import XSvg from "../../../components/svgs/X";
import {useMutation} from "@tanstack/react-query"
import { MdOutlinePerson2 } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { baseUrl } from "../../../constant/url.js";
import Toast from "react-hot-toast";
import {useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const queryClient = useQueryClient();
	const{mutate: login, isPending, isError, error} = useMutation({
		mutationFn : async ({username, password}) => {
			try{
				const res = await fetch(`${baseUrl}/api/auth/login`,{
					method:"POST",
					credentials: "include",
					headers :{
						"content-Type": "application/json",
					},
					body : JSON.stringify({username,password})
				})

				const data = await res.json();
				if(!res.ok){
					throw new Error(data.error || "Something went wrong");
				}

			}catch(error){
				throw error;
			}
		},
		onSuccess : () => {
			Toast.success("Login success");
			//refetch the authUser
			queryClient.invalidateQueries({
				queryKey : ["authUser"]
			});
		}
	})


	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("sending:", formData);
		login(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};


	return (
		<div className='max-w-screen-xl mx-auto flex h-screen'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlinePerson2 />
						<input
							type='text'
							className='grow'
							placeholder='username'
							name='username'
							onChange={handleInputChange}
							value={formData.username}
						/>
					</label>

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn rounded-full bg-blue-600 btn-primary text-white'>{isPending? <LoadingSpinner/> : "Login"}</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col gap-2 mt-4'>
					<p className='text-white text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='border-2 border-white text-blue-500 px-7 py-2 rounded-md hover:border-blue-500 hover:text-white hover:bg-blue-500 transition '>Sign up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;