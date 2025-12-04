import {useEffect} from "react";
import {supabase} from "../App";
import {Navigate} from "react-router-dom";


function Disconnect() {

	useEffect(() => {
		disconnect();
	}, []);

	async function disconnect() {
		await supabase.auth.signOut();
	}

	return (
		<Navigate to="/login"/>
	)
}

export default Disconnect;