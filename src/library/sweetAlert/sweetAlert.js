import Swal from "sweetalert2";
import "./sweetAlert.css";
export const sweetToast = (title, icon = null, timer = 2000) => {
  return Swal.fire({
    toast: true,
    title,
    position: "top",
    showConfirmButton: false,
    icon,
    timer
  });
};
;
