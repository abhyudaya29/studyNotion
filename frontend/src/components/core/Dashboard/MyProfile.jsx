
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../common/iconButton';

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  
  const navigate = useNavigate();

  // Function to format date
  const formattedDate = (date) => {
    // You need to implement the formatting logic here
    return date; // Placeholder, replace with actual formatting logic
  };

  return (
    <div className="px-4 py-8">
      <h1 className="mb-8 text-3xl font-medium text-richblack-5">My Profile</h1>

      {/* Profile Section */}
      <div className="border border-richblack-700 bg-richblack-800 rounded-md p-8 flex items-center justify-between mb-8">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="w-20 h-20 rounded-full object-cover mr-4"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-richblack-5">{`${user?.firstName} ${user?.lastName}`}</p>
          <p className="text-sm text-richblack-300">{user.email}</p>
        </div>
        <IconButton
          text="Edit"
          onClick={() => {
            navigate('/dashboard/settings');
          }}
          className="ml-auto"
        />
      </div>

      {/* About Section */}
      <div className="border border-richblack-700 bg-richblack-800 rounded-md p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconButton
            text="Edit"
            onClick={() => {
              navigate('/dashboard/settings'); // Corrected typo: 'seetings' to 'settings'
            }}
          />
        </div>
        <p>{user?.additionalDetails?.about || 'Write something about yourself'}</p>
      </div>

      {/* Personal Details Section */}
      <div className="border border-richblack-700 bg-richblack-800 rounded-md p-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <IconButton
            text="Edit"
            onClick={() => {
              navigate('/dashboard/settings'); // Corrected typo: 'seetings' to 'settings'
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
          <div>
            <p className="mb-2 text-sm text-richblack-600">First Name</p>
            <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
          </div>
          {/* Add other personal details similarly */}
          <div>
            <p className="mb-2 text-sm text-richblack-600">Email</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.email}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Gender</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.gender ?? 'Add Gender'}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.lastName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.contactNumber ?? 'Add Contact Number'}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
            <p className="text-sm font-medium text-richblack-5">
              {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                'Add Date Of Birth'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
