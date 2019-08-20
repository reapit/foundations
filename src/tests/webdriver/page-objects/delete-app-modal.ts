class DeleteAppModal {
  get btnConfirm() {
    return $("[data-test='agree-btn']")
  }

  get alertDeleteAppSuccess() {
    return $("[data-test='disagree-btn']")
  }
}

export default new DeleteAppModal()
