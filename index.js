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

