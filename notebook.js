class HNoteBook {
	constructor() {
		if (typeof localStorage == "undefined") {
			if (typeof document.cookie == "undefined") {
				//未支援
				this.usingTechnical = "nosupport"
				NoteBookApp.notSupport = true
			} else {
				//支援 Cookie
				this.usingTechnical = "cookie"
				$.getScript("https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js")
			}
		} else {
			//支援 localStorage
			this.usingTechnical = "local"

		}
	}
	getData() {
		switch (this.usingTechnical) {
			case "cookie":
				if (typeof Cookies.get("NBData") == "undefined") {
					NoteBookApp.notes.push({
						name: "範例",
						time: new Date().toLocaleString()
					})
				}else{
					NoteBookApp.notes = JSON.parse(Cookies.get("NBData"))
				}
				break;
			case "local":
				if (!localStorage.getItem("NBData")) {
					NoteBookApp.notes.push({
						name: "範例",
						time: new Date().toLocaleString()
					})
				}else{
					NoteBookApp.notes = JSON.parse(localStorage.getItem("NBData"))
				}
				break;
		}
	}
	saveAll(){
		switch (this.usingTechnical) {
			case "cookie":
				Cookies.setData("NBData",JSON.stringify(NoteBookApp.notes))
				break;
			case "local":
				localStorage.setItem("NBData",JSON.stringify(NoteBookApp.notes))
				break;
		}
	}
}
