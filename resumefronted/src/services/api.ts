


//persist only remembers the login state.

//It does not yet automatically send the JWT to Spring Boot
//connect your JWT token from Zustand to Axios, so every protected request automatically sends the token to Spring Boot.
//We will add an Axios request interceptor.so when we hit a protected api 
// first axios run this interceptor and get jwt ,so the request sent to Spring Boot 
// becomes:GET /api/resume  
//Authorization:
//Bearer eyJhbGciOiJIUzI1Ni...

import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

    headers: {
        "Content-Type": "application/json",
    },
});


// ===============================
// REQUEST INTERCEPTOR
// ===============================

api.interceptors.request.use((config) => {

    const token = useAuthStore.getState().accessToken;

    

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});


// ===============================
// RESPONSE INTERCEPTOR
// ===============================

api.interceptors.response.use(

    // If response is successful
    (response) => {

        return response;
    },


    // If response has an error
    async (error) => {

        const originalRequest = error.config;


        // Check for 401 Unauthorized
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;


            try {

                // Get refresh token from Zustand
                const refreshToken =
                    useAuthStore.getState().refreshToken;


                // No refresh token
                if (!refreshToken) {

                    useAuthStore.getState().logout();

                    return Promise.reject(error);
                }




                // Send refresh token
                const response = await axios.post(
                  `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    {
                        refreshToken: refreshToken
                    }
                );


                const newAccessToken =
                    response.data.accessToken;



                // Save new access token
                useAuthStore.setState({

                    accessToken: newAccessToken,

                });


                // Update original request
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;


                // Retry original request
                return api(originalRequest);


            } catch (refreshError) {



                // Refresh token is invalid/expired
                useAuthStore.getState().logout();


                return Promise.reject(
                    refreshError
                );
            }
        }


        return Promise.reject(error
            
        );
    }
);


export default api;