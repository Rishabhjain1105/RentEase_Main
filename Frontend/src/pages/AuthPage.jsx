import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
// import { Building2 } from 'lucide-react';

import SignUp from '../components/Auth/SIgnUp'


function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    if (location.state?.isLogin !== undefined) {
      setIsLoginView(location.state.isLogin);
    }
  }, [location]);

  const handleSignupSuccess = () => {
    setIsLoginView(true); 
  };

  return (
    //full screen div
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      

      {/* Auth Container */}
      <div className="max-w-5xl h-screen mx-auto px-4 py-16 ">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Main Container */}
          <div className="flex min-h-[600px]">

            {/* Left Side - Image */}
            <div className="hidden w-[40%] md:block bg-gradient-to-b from-blue-700 to-blue-300 p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Welcome to RentEase</h2>
              <p className="text-lg opacity-90">
                Your complete solution for property management and rental services.
              </p>
            </div>

            {/* Right Side - Forms */}
            <div className="w-[60%] px-12 py-12">
              {isLoginView ? (
                <>
                  <LoginForm />
                  <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setIsLoginView(false)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign Up
                    </button>
                  </p>
                </>
              ) : (
                <>
                 <SignUp onSuccess={handleSignupSuccess} />
                  
                  <p className="text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={() => {
                        setIsLoginView(true);
                        setUserType(null);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Login
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;