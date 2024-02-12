export default function RegisterPopup({closePopup}: {closePopup: () => void}){

  return (
    <div
      className={"popup"}
    >
      <h3>Thanks for Registering!</h3>
      <p>Please check your email and click the confirmation link to proceed.</p>
      <div className={"popupBtnContainer"}>
        <div className={"midBtn"} onClick={closePopup}>
          OK
        </div>
      </div>
    </div>
  );
}