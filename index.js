document.addEventListener(DOMContentLoaded, () => {
    const toggleMenu = () =>{
        const menu = document.getElementById('navMenu');
        if(menu)menu.classList.toggle('active'); 
    }
    window.toggleMenu = toggleMenu;
});
 const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if(!section) return;
        const headerHeight = 70; // Altura fixa do cabeçalho
        const sectionPosition = section.offsetTop - headerHeight;
        window.scrollTo({top: sectionPosition, behavior: 'smooth'});

        const menu = document.getElementById('navMenu');
        if(menu) menu.classList.remove('active'); // Fecha o menu após clicar em um link
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const form = document.getElementById("volunteerForm");
        if(!form) return;

       if (form.dataset.submmiting == 'true') return; //Evitando sobreposição de usuários
       form.dataset.submmiting = 'true';

       const nome = form.nome.value.trim();//O método trim() remove espaços em branco do início e do fim da string.
       const email = form.email.value.trim();

       if( !nome || !email){
        alert("Por favor, preencha os campos obrigatórios.");
        form.dataset.submmiting = 'false'; //Se for vazio, não grava os dados.
        return;
       }
 const formData = {
        nome,
        email,
        cpf : form.cpf.value.trim(),
        idade: form.idade.value.trim(),
        data_nascimento: form.data_nascimento.value.trim(),
        telefone: form.telefone.value.trim(),
        endereco: form.endereco.value.trim(),
        cep: form.cep.value.trim(),
        cidade: form.cidade.value.trim(),
        estado: form.estado.value.trim(),
        disponibilidade: form.disponibilidade.value.trim(),
        atuacao: form.atuacao.value.trim(),
        possui_animais: form.possui_animais.checked,
        dataCadastro: new Date().toLocaleString()
       };
       
        let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
        voluntarios.push (formData);
        localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
    }
const handleDonnerSubmit = (event) => {
        event.preventDefault();
        const form = document.getElementById("donnerForm");
        if(!form) return;
         if (form.dataset.submmiting == 'true') return; //Evitando sobreposição de usuários
         form.dataset.submmiting = 'true';
            const nome_empresa = form.nome_empresa.value.trim();
            const cnpj = form.cnpj.value.trim();

            if( !nome_empresa || !cnpj){
            alert("Por favor, preencha os campos obrigatórios.");
            form.dataset.submmiting = 'false'; //Se for vazio, não grava os dados.
            return;
            }
            //Mapear as informações inseridas pelo usuário
            const formData = {
            nome,
            cpf : form.cpf.value.trim(),
            idade: form.idade.value.trim(),
            data_nascimento: form.data_nascimento.value.trim(),
            nome_empresa,
            razao_social: form.razao_social.value.trim(),
            cnpj,
            telefone_comenrcial: form.telefone.value.trim(),
             dataCadastro: new Date().toLocaleString()
            }

            let parceiros = JSON.parse(localStorage.getItem('parceiros')) || [];
        parceiros.push (formData);
        localStorage.setItem('parceiros', JSON.stringify(parceiros));
const successMessage = document.getElementById('successMessage');
            if(successMessage){
                successMessage.classList.add('show');
                successMessage.scrollIntoView({behavior: "smooth", block: "center"});
            }
            setTimeout(() => successMessage.classList.remove('show'), 5000);

            setTimeout(() => {
                form.reset();
                form.dataset.submmiting = 'false';
            }, 2000);
exibirVoluntarios();
    };
    const form = document.getElementById('volunteerForm');
    if(form) form.addEventListener('submit', handleSubmit);

    const donnerForm = document.getElementById('donnerForm');
    if(donnerForm) donnerForm.addEventListener('submit', handleDonnerSubmit);

    const exibirVoluntarios = () => {
        const voluntarios= JSON.parse(localStorage.getItem('voluntarios')) || [];
        const tabelaContainer = document.getElementById('voluntariosTableBody');

        if(!tabelaContainer) return;
        if(voluntarios.length === 0){
            tabelaContainer.innerHTML = '<P> Ninguém cadastrado ainda. </p>';
            return;
        }

        let html = '<table border="1" cellpadding="5" cellpadding="0"';
        html += '<tr><th>Nome</th><th>Email</th><th>CPF</th><th>Idade</th><th>Data de Nascimento</th><th>Telefone</th><th>Endereço</th><th>CEP</th><th>Cidade</th><th>Estado</th><th>Disponibilidade</th><th>Área de Atuação</th><th>Possui Animais</th><th>Data de Cadastro</th></tr>';

        voluntarios.forEach(voluntario => {
            html += `<tr>
            <td>${v.nome}</td>
            <td>${v.email}</td>
            <td>${v.cpf}</td>
            <td>${v.idade}</td>
            <td>${v.data_nascimento}</td>
            <td>${v.telefone}</td>
            <td>${v.endereco}</td>
            <td>${v.cep}</td>
            <td>${v.cidade}</td>
            <td>${v.estado}</td>
            <td>${v.disponibilidade}</td>
            <td>${v.atuacao}</td>
            <td>${v.possui_animais ? 'Sim' : 'Não'}</td>
            <td>${v.dataCadastro}</td>
            </tr>`;
        });
        html += '</table>';
        tabelaContainer.innerHTML = html;
    };
    exibirVoluntarios();
};
const form = document.getElementById(donnerForm);
if(form) form.addEventListener('submit', handleDonnerSubmit);

const exibirParceiros = () => {
    const parceiros= JSON.parse(localStorage.getItem('parceiros')) || [];
    const tabelaContainer = document.getElementById('parceirosTableBody');
    if(!tabelaContainer) return;
    if(parceiros.length === 0){
        tabelaContainer.innerHTML = '<P> Ninguém cadastrado ainda. </p>';
        return;
    }
    let html = '<table border="1" cellpadding="5" cellpadding="0"';
    html += '<tr><th>Nome</th><tr><th>Nome da Empresa</th><th>Razão Social</th><th>CNPJ</th><th>Telefone Comercial</th><th>Data de Cadastro</th></tr>';
    parceiros.forEach(parceiro => {
        html += `<tr>
        <td>${p.nome}</td>
        <td>${p.nome_empresa}</td>
        <td>${p.razao_social}</td>
        <td>${p.cnpj}</td>
        <td>${p.telefone_comenrcial}</td>
        <td>${p.dataCadastro}</td>
        </tr>`;
    });
    html += '</table>';
    tabelaContainer.innerHTML = html;
};
exibirParceiros();
});

