class WindowAlerter {
  ERROR_SVG_FILE_NAME = 'xMark';
  SUCCESS_SVG_FLE_NAME = 'checkMark';


  alertDivConstructor(alertType, alertText) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alertWindow');

    alertDiv.appendChild(this.createWindowIcon(alertType));
    alertDiv.appendChild(this.createWindowText(alertText));

    document.body.appendChild(alertDiv);

    let disappearTimeOut = setTimeout(() => {this.removeWindow(alertDiv)}, 4000);

    alertDiv.addEventListener('mouseover', () => clearTimeout(disappearTimeOut) );
    alertDiv.addEventListener('mouseout', () => disappearTimeOut = setTimeout(() => {this.removeWindow(alertDiv)}, 2000) );
  }

  getFileNameByAlertType(alertType) {
    return alertType.trim() === 'success' ? this.SUCCESS_SVG_FLE_NAME : this.ERROR_SVG_FILE_NAME;
  }

  createWindowIcon(alertType) {
    const windowIcon = document.createElement('img');
    windowIcon.src = `/assets/icons/${this.getFileNameByAlertType(alertType)}.svg`;
    windowIcon.alt = this.getFileNameByAlertType(alertType);
    windowIcon.classList.add('alertIcon');

    return windowIcon;
  }

  createWindowText(alertText) {
    const windowText = document.createElement('span');
    windowText.innerText = alertText;
    windowText.classList.add('windowText');

    return windowText;
  }

  removeWindow(alertWindow) {
    alertWindow.classList.add('removed');
    setTimeout(() => alertWindow.remove(), 200);
  }
}


export default WindowAlerter;