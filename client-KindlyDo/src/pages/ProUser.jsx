import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../helpers/api";
import Swal from "sweetalert2";

export default function ProUser() {
    // const [user, setUser] = useState({});
    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        async function fetchData() {
            try {
                const user = await api.get(`/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                    }
                });
                // console.log(user);
                // setUser(user.data);
                const options = {
                    method: 'POST',
                    url: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        authorization: 'Basic U0ItTWlkLXNlcnZlci13Yzh2NlJ3azBLeTViSlFwa0pHRHd6aGY6'
                    },
                    data: {
                        // transaction_details: { order_id: 'Be PRO! Duar NmaX', gross_amount: 5000 },
                        transaction_details: {
                            order_id: `INV-${new Date().getFullYear()}/${id}/${new Date().getSeconds()}/${new Date().getMilliseconds()}`,
                            // 
                            gross_amount: 5000
                        },
                        credit_card: { secure: true }
                    }
                };
                // console.log(options);
                await axios
                    .request(options)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.error(error);
                    });

            } catch (error) {
                if (error.response) {
                    Swal.fire({
                        title: "Error!",
                        text: error.response.data.message,
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong",
                        icon: "error"
                    });
                }
            }
        }
        fetchData();
    }, []);

    return (
        <>
        </>
    )
}