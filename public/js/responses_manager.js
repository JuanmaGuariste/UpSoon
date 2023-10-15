async function sendInfo(uid) {
    try {
        const data = { rol: "premium" };
        const response = await fetch(`/api/users/premium/${uid}`, {
            method: 'POST',           
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            Swal.fire({
                title: 'Felicitaciones!',
                text: 'Ya eres usuario premium.',
                icon: 'success'
            })
                .then(() => {
                    window.location.href = '/current';
                })

        } else {
            Swal.fire({
                title: 'Error',
                text: 'Error al enviar la solicitud.',
                icon: 'error'
            })
                .then(() => {
                    window.location.href = '/premium';
                })
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al enviar la solicitud.',
            icon: 'error'
        })
            .then(() => {
                window.location.href = '/premium';
            })
    }
}

async function notPremium(uid) {
    try {
        const data = { rol: "user" };
        const response = await fetch(`/api/users/premium/${uid}`, {
            method: 'POST',           
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            Swal.fire({
                title: 'Listo!',
                text: 'Ya no eres usuario premium.',
                icon: 'success'
            })
                .then(() => {
                    window.location.href = '/current';
                })

        } else {
            Swal.fire({
                title: 'Error',
                text: 'Error al enviar la solicitud.',
                icon: 'error'
            })
                .then(() => {
                    window.location.href = '/premium';
                })
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al enviar la solicitud.',
            icon: 'error'
        })
            .then(() => {
                window.location.href = '/premium';
            })
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const filesForm = document.getElementById("filesForm");
    filesForm.addEventListener("submit", async function (e) {
        e.preventDefault(); 
        try {
            const response = await fetch(filesForm.action, {
                method: filesForm.method,
                body: new FormData(filesForm),
            });
            if (response.ok) {
                Swal.fire({
                    title: 'Los archivos se subieron correctamente.',
                    text: 'Ahora puede enviarla solicitud.',
                    icon: 'success'
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al enviar la solicitud.',
                    icon: 'error'
                })
                    .then(() => {
                        window.location.href = '/premium';
                    })
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error al enviar la solicitud.',
                icon: 'error'
            })
                .then(() => {
                    window.location.href = '/premium';
                })
        }
    });
});