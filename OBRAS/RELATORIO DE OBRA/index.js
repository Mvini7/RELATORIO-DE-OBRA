let savedPDF = null; // Variável global para armazenar o PDF

        async function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Captura os dados do formulário
            const nomeObra = document.getElementById('nome-obra').value;
            const data = document.getElementById('data').value;
            const localObra = document.getElementById('local-obra').value;
            const modeloObra = document.getElementById('modelo-obra').value;
            const estagioObra = document.getElementById('estagio-obra').value;

            // Adiciona texto ao PDF
            doc.text(`Nome da Obra: ${nomeObra}`, 10, 10);
            doc.text(`Data: ${data}`, 10, 20);
            doc.text(`Local da Obra: ${localObra}`, 10, 30);
            doc.text(`Modelo da Obra: ${modeloObra}`, 10, 40);
            doc.text(`Estágio Percentual da Obra: ${estagioObra}%`, 10, 50);

            // Se houver uma foto, adicione-a ao PDF
            const fotoObra = document.getElementById('foto-obra').files[0];
            if (fotoObra) {
                const reader = new FileReader();
                reader.onload = async function(event) {
                    doc.addImage(event.target.result, 'JPEG', 10, 60, 180, 120);
                    savedPDF = doc.output('blob'); // Salva o PDF na variável global
                }
                reader.readAsDataURL(fotoObra);
            } else {
                savedPDF = doc.output('blob'); // Salva o PDF na variável global
            }
        }

        function downloadPDF() {
            if (!savedPDF) {
                console.log('Nenhum PDF gerado para baixar.');
                return;
            }

            // Exibe o Blob do PDF no console
            console.log('PDF Blob:', savedPDF);

            // Cria um link temporário para download
            const url = URL.createObjectURL(savedPDF);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'relatorio_obras.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Libera o URL criado
            URL.revokeObjectURL(url);
        }