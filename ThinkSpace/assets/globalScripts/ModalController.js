class ModalController {
  MODAL_ELEMENT;
  constructor(modalId) {
    this.MODAL_ELEMENT = document.querySelector(`#${modalId}`);

    this.MODAL_ELEMENT.addEventListener('click', (e) => {
      if(e.target.classList.contains('modal')) { this.closeModal(); }
    })
  }

  closeModal() {
    this.MODAL_ELEMENT.classList.remove('opened');
  }

  openModal() {
    this.MODAL_ELEMENT.classList.add('opened');
  }
}

export default ModalController;
