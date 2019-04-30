jQuery(document).ready(function($) {
      var urlBase = "//fipe.parallelum.com.br/api/v1";
      /** Marcas**/
	$("#categoria").change(function() {
      $.getJSON(urlBase + "/" + jQuery("#categoria").val() + "/" + "marcas", function(data) {
        var items = ["<option value=\"\">Selecione uma marca</option>"];
        $.each(data, function(key, val) {
          items += ("<option value='" + val.codigo + "'>" + val.nome + "</option>");
        });
        $("#marcas").html(items);
      });
	 });
		
      /** Veiculo**/

      $("#marcas").change(function() {
        $.getJSON(urlBase +"/" + jQuery("#categoria").val() + "/"+ "marcas" +"/"+ jQuery("#marcas").val() + "/" + "modelos", function(data) {
          var items = ["<option value=\"\">Selecione o modelo</option>"];
          $.each(data.modelos, function(key, val) {
            items += ("<option value='" + val.codigo + "'>" + val.nome + "</option>");
          });
          $("#modelos").html(items);
        });
      });

      /** Ano**/

      $("#modelos").change(function() {
        $.getJSON(urlBase +"/" + jQuery("#categoria").val() + "/"+ "marcas" +"/"+ jQuery("#marcas").val() + "/" + "modelos" + "/" + jQuery("#modelos").val() + "/" + "anos", function(data) {
          var items = ["<option value=\"\">Selecione o ano</option>"];
          $.each(data, function(key, val) {
            console.log(data)
            items += ("<option value='" + val.codigo + "'>" + val.nome + "</option>");
          });
          $("#ano").html(items);
        });
      });
	/*--------Dados completo---------*/
		
		$("#ano").change(function() {
        $.getJSON(urlBase +"/" + jQuery("#categoria").val() + "/"+ "marcas" +"/"+ jQuery("#marcas").val() + "/" + "modelos" + "/" + jQuery("#modelos").val() + "/" + "anos"+"/" + jQuery("#ano").val(), function(dados) {
          var items;
			var data = new Date();
			var dia = data.getDate();
			var mes = data.getMonth()+1;
			var ano = data.getFullYear();
            var str_data = dia +"/"+ mes +"/"+ ano;
			
            items += ("<tr><td>Referência</td><td>" + dados.MesReferencia + "<td></tr>"
					  +"<tr><td>Código Fipe:</td><td>" + dados.CodigoFipe + "<td></tr>"
					  +"<tr><td>Marca</td><td>" + dados.Marca + "<td></tr>"
					  +"<tr><td>Modelo</td><td>" + dados.Modelo + "<td></tr>"
					  +"<tr><td>Ano Modelo</td><td>" + dados.AnoModelo + "<td></tr>"
					  +"<tr><td>Data da consulta</td><td>" + str_data + "<td></tr>"
					  +"<tr><td>Preço</td><td>" + dados.Valor + "<td></tr>"
					  );
          
          $("#veiculo").html(items);
		  $("#veiculo").css("display", "block");
        });
		$("#btn_fipe").show();	
      });
	// limpa formulario
	$("#btn_fipe").css("display", "none");
	$("#btn_reset").click(function(){
		$("#veiculo").css("display", "none");
		$("#form_fipe")[0].reset();
		$("#btn_fipe").css("display", "none");
		
	});
	});