import {useUser} from "@/features/authentication/useUser.js";
import Spinner from "@/ui/Spinner.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import PropTypes from "prop-types";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

function ProtectedRoute({children}) {
  const navigate = useNavigate();
  // 1. load auth user
  const {isLoading, isAuthenticated} = useUser();

  // 3. if no user, redirect to login page
  useEffect(function () {
    if (!isAuthenticated && !isLoading) navigate("/login")
  }, [isAuthenticated, isLoading, navigate]);

  // 2. while loading, show spinner
  if (isLoading) return (
    <FullPage>
      <Spinner/>
    </FullPage>
  )

  // 4. if there is user, render app
  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
}

export default ProtectedRoute;