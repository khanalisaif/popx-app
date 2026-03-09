import React, { useState, useRef } from 'react';

const EyeIcon = ({ open }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

const SheetOverlay = ({ open, onClose, title, children }) => (
  <>
    <div
      className={`absolute inset-0 bg-black/40 z-20 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    />
    <div
      className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-30 transition-transform duration-300 ease-out shadow-2xl ${open ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-gray-300" />
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-5 overflow-y-auto" style={{ maxHeight: '70vh' }}>
        {children}
      </div>
    </div>
  </>
);

const ChangePasswordSheet = ({ open, onClose }) => {
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShow = (key) => setShow((p) => ({ ...p, [key]: !p[key] }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: '' }));
    setSuccess(false);
  };

  const validate = () => {
    const e = {};
    if (!form.current) e.current = 'Current password is required';
    if (!form.newPass) e.newPass = 'New password is required';
    else if (form.newPass.length < 6) e.newPass = 'At least 6 characters';
    if (!form.confirm) e.confirm = 'Please confirm your password';
    else if (form.newPass !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ current: '', newPass: '', confirm: '' });
      setTimeout(onClose, 1200);
    }, 900);
  };

  const PwdField = ({ label, name }) => (
    <div className="relative">
      <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-semibold text-[#6C35DE] z-10">{label}</label>
      <input
        name={name}
        type={show[name] ? 'text' : 'password'}
        value={form[name]}
        onChange={handleChange}
        className={`w-full border ${errors[name] ? 'border-red-400' : 'border-gray-300'} focus:border-[#6C35DE] rounded-lg px-4 py-4 pr-12 text-sm text-gray-700 bg-white transition-colors`}
      />
      <button type="button" onClick={() => toggleShow(name)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
        <EyeIcon open={show[name]} />
      </button>
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
    </div>
  );

  return (
    <SheetOverlay open={open} onClose={onClose} title="Change Password">
      <div className="flex flex-col gap-5">
        <PwdField label="Current Password" name="current" />
        <PwdField label="New Password" name="newPass" />
        <PwdField label="Confirm New Password" name="confirm" />

        {success && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-green-700 font-medium">Password updated successfully!</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#6C35DE] hover:bg-[#5a28cc] active:scale-95 text-white font-semibold text-sm py-4 rounded-lg transition-all duration-200 shadow-md shadow-purple-200 mt-1"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Updating...
            </span>
          ) : 'Update Password'}
        </button>
      </div>
    </SheetOverlay>
  );
};

const AccountSettingsPage = ({ userData, onBack }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(
    'Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam'
  );
  const fileInputRef = useRef(null);
  const [activeSheet, setActiveSheet] = useState(null);

  const displayName = userData?.fullName || 'Marry Doe';
  const displayEmail = userData?.emailAddress || 'Marry@Gmail.Com';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="page-enter flex flex-col min-h-screen bg-white relative overflow-hidden">
      <div className="px-5 pt-8 pb-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Account Settings</h1>
      </div>

      <div className="mx-4 mt-4 bg-gray-50 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-purple-400 flex items-center justify-center shadow-md">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-xl font-bold">{initials}</span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#6C35DE] flex items-center justify-center shadow-lg hover:bg-[#5a28cc] active:scale-95 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-gray-900 truncate">{displayName}</h2>
            <p className="text-sm text-gray-500 truncate">{displayEmail}</p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex-shrink-0 text-[#6C35DE] text-xs font-semibold hover:text-[#5a28cc] transition-colors"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-dashed border-gray-300">
          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-sm text-gray-600 leading-relaxed bg-white border border-[#6C35DE] rounded-lg p-3 resize-none focus:outline-none"
              rows={4}
            />
          ) : (
            <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
          )}
        </div>
      </div>

      <div className="px-4 mt-6 flex flex-col gap-3">
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Account Info</h3>
          <div className="flex flex-col gap-3">
            <InfoRow label="Full Name" value={displayName} />
            <InfoRow label="Email" value={displayEmail} />
            {userData?.phoneNumber && <InfoRow label="Phone" value={userData.phoneNumber} />}
            {userData?.companyName && <InfoRow label="Company" value={userData.companyName} />}
            {userData?.isAgency !== undefined && (
              <InfoRow label="Agency" value={userData.isAgency === 'yes' ? 'Yes' : 'No'} />
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl overflow-hidden">
          <ActionRow icon="🔐" label="Change Password" onClick={() => setActiveSheet('password')} last />
        </div>

        <button
          onClick={onBack}
          className="w-full py-3 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 active:scale-95 transition-all"
        >
          Logout
        </button>
      </div>

      <div className="mt-auto pb-8 text-center pt-6">
        <p className="text-xs text-gray-400 font-medium">
          Assignment for{' '}
          <span className="text-[#6C35DE] font-semibold">Educase India</span>
        </p>
      </div>

      <ChangePasswordSheet open={activeSheet === 'password'} onClose={() => setActiveSheet(null)} />
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    <span className="text-sm text-gray-800 font-semibold">{value}</span>
  </div>
);

const ActionRow = ({ icon, label, last, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3.5 hover:bg-gray-100 active:bg-gray-200 cursor-pointer transition-colors ${!last ? 'border-b border-gray-200' : ''}`}
  >
    <div className="flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      <span className="text-sm text-gray-700 font-medium">{label}</span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

export default AccountSettingsPage;
