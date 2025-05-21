const forgotPasswordTemplate = ({ name, otp }) => {
  return `
<div>
    <p>Dear, ${name}</p>
    <p>You have requested a password reset. Please use following OTP code to reset your password.</p>
    <div style="background:gray; font-size:20px;padding:20px;text-align:center;font-weight : 800;">
        ${otp}
    </div>
    <p>This otp is valid for 1 hour only</p>
    <br/>
    </br>
    <p>Thanks</p>
    <p>Pabitra Bhandar</p>
</div>
    `;
};

export default forgotPasswordTemplate;
