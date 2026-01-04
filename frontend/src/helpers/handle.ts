export function setVisible(id: string, isVisibility = true) {
  document.getElementById(id)!.style.visibility = isVisibility
    ? "visible"
    : "hidden"
}

export function handleX(obj: string) {
  const rxName = document.getElementById("rxName") as HTMLInputElement
  if (obj === "rxName" && rxName.value) {
    rxName.value = ""
    ;(
      document.getElementById("txtStrength") as HTMLDivElement
    ).style.visibility = "hidden"
    rxName.focus()
  }
  const rxStrength = document.getElementById("rxStrength") as HTMLInputElement
  if (obj === "rxStrength" && rxStrength.value) {
    rxStrength.value = ""
    rxStrength.focus()
    setVisible("btnAdd", false)
  }
}
