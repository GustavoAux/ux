angular.module('ux', []);
angular.module('ux').controller('uxCtrl', ($scope)=>{
    $scope.titulo = "Eagle hotel";
    $scope.subtitulo = "Welcome!";

    $scope.atendente = new Atendente();

    $scope.status_login = "Logout - "+$scope.atendente.nome;

    $scope.apartamentos = [];
    $scope.usuarios = [];

    let quantidade_aps = 600;
    // console.log("****************************************");
    for(let i = 400; i <= quantidade_aps; i++){
        let ap = new Apartemento(i, quantidade_aps);
        // console.log(ap.status);        
        $scope.apartamentos.push(ap);
    }
    // console.log("****************************************");
    $scope.apartamentos.forEach((valor, chave) => {
        if(valor.dono != undefined && valor.status == 'Occupied'){
            $scope.usuarios.push(valor.dono);
        }      
    });

    $scope.geraId = (nome) => {
        return nome.toLowerCase().replace(/\s/igm, '-');
    };

    $scope.chamar_close_and_pay = (id, numero, nome, estado, desligar) =>{
        document.querySelector('#'+geraId(id)+'-'+numero+'').style.display = estado;
        if(desligar == true){
            $scope.close_and_pay(nome);
        }
    };

    $scope.close_and_pay = (nome)=>{
        let parcial_usuarios = [];
        let parcial_apartamentos = [];
        let numero = 0;

        for(let i = 0; i < $scope.usuarios.length; i++){
            if($scope.usuarios[i] != null){
                if($scope.usuarios[i].nome != nome){
                    numero =  $scope.usuarios[i].numero;
                    parcial_usuarios.push($scope.usuarios[i]);
                }
            }            
        }

        for(let i = 0; i < $scope.apartamentos.length; i++){
            if($scope.apartamentos[i] != null){
                if($scope.apartamentos[i].numero != numero){
                    parcial_apartamentos.push($scope.apartamentos[i]);
                }
            }
        }
        $scope.usuarios = parcial_usuarios;
        $scope.apartamentos = parcial_apartamentos;


    };

    $scope.trocaSubtitulo = (subtitulo) =>{
        $scope.subtitulo = subtitulo;
    };

    $scope.trocaSubtituloEAparece = (subtitulo, id)=> {
        $scope.subtitulo = subtitulo;
        let x = document.getElementsByClassName('conteudo');
        for(let i = 0; i < x.length; i++){
            x[i].style.display = 'none';
        }
        document.querySelector('#'+id).style.display = 'block';
    };


    $scope.quantidadeEmManutencao = 0;
    $scope.quantidadeOcupados = 0;
    let parcialQuantidadeOcupados = 0;
    $scope.quantidadeReservados = 0;

    $scope.apartamentos.forEach((valor, chave) => {
        if(valor.status == 'Maintenance'){
            $scope.quantidadeEmManutencao++;
        }
        else if(valor.status == 'Occupied'){
            parcialQuantidadeOcupados++;
        }      
        else if(valor.status = 'Reservated'){
            $scope.quantidadeReservados++;
        }
    });

    $scope.quantidadeOcupados = Math.floor((parcialQuantidadeOcupados / $scope.apartamentos.length) * 100);
    
    $scope.quantidade_mensagens = randomizar_inteiro(1, $scope.usuarios.length);

    $scope.mensagens = [];
    for(let i  = 0; i < $scope.quantidade_mensagens; i++){
        $scope.mensagens.push(new Mensagem(randomizar_lista($scope.usuarios)));
    };
    
    

    $scope.nacionalidades = [
            "South African", "German", "Argentine", "Australian", "Belgium",	
            "Bolivian",	"Brazilian",  "Canadian", "Chilean", "Chinese",	
            "Colombian", "Korean", "Ecuadorian", "Spanish", "American",	
            "Dannish", "Fins ou Finnish",  "French", "Greek", "Indian",
            "English ou British", "Israeli", "Italian", "Japanese",
            "Mexican", "Norwegian", "Paraguayan", "Peruvian", "Portugues",
            "Russian", "Swiss", "Uruguayan", "Venezuelan", "Persian / Iranian",
            "Iraqi", "Egyptian", "Lebanese", "Turkish", "Pakistani",
            "Syrian", "Thai", "Vietnamese", "Costa Rican"
    ];

    $scope.modo_pagamento = [ 'Money', 'Card', 'Cheq'];


    $scope.status_controle_tv  = 'Off';
    $scope.status_controle_tv_volume  = 55;
    $scope.status_controle_tv_chanel  = 12;
    $scope.status_controle_air  = 'Off';
    $scope.status_controle_air_temperature  = 20;

    $scope.status_controle_bedroom_light = 'Off';
    $scope.status_controle_livin_room_light = 'Off';
    $scope.status_controle_kitchen_light = 'Off';
    $scope.status_controle_bathroom_light = 'Off';
    
    
    $scope.usuario =  randomizar_lista($scope.usuarios);
    $scope.status_login_usuario = "User: "+$scope.usuario.nome;
    $scope.mensagem = new Mensagem($scope.usuario);

    $scope.pratos = [];
    for(let i = 0; i < 11; i++){
        $scope.pratos.push(new Food());
    }

    //console.log($scope.pratos);
    
    // console.log($scope.apartamentos);
    
});