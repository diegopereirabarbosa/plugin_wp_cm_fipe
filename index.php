<?php 
/*
	plugin name: CM Consulta Fipe
	Plugin uri: https://github.com/diegopereirabarbosa/plugin_wp_cm_fipe
	Description: Esse plugin fará acesso a tabela fipe de veículos do Brasil
	Version: 1.0
	License: GPLv2 or later
	Author: Diego Pereira
	Author uri: https://conectmotors.com.br


*/
function cm_consulta_fipe_register() {
register_widget( 'cm_consulta_fipe' );
}

add_action( 'widgets_init', 'cm_consulta_fipe_register' );

function insere_scripts() {
	wp_enqueue_script("jquery");
	wp_enqueue_script('cm_fipe', plugin_dir_url(__FILE__) . 'js/cm_fipe.js',array('jquery'));
}
add_action( 'wp_enqueue_scripts', 'insere_scripts' );

class cm_consulta_fipe extends WP_Widget {

function __construct() {
parent::__construct(
// widget ID
'cm_consulta_fipe',
// widget name
__('CM Consulta Fipe', ' cm_widget_fipe'),
// widget description
array( 'description' => __( 'Consulta a tabela fipe', 'cm_widget_fipe' ), )
);
}
public function widget( $args, $instance ) {
$title = apply_filters( 'widget_title', $instance['title'] );
echo $args['before_widget'];
//if title is present
if ( ! empty( $title ) )
echo $args['before_title'] . $title . $args['after_title'];
//printa na tela
//echo __( 'Aqui vai o conteudo', 'cm_widget_fipe' );
?>
<form id="form_fipe">
<div class="form-group">
	<label>Tabela fipe de veículos</label>
  <select id="categoria" class="form-control">
	  <option value="">Selecione a categoria</option>
	  <option value="carros">CARROS</option>
	  <option value="motos">MOTOS</option>
	  <option value="caminhoes">CAMINHÕES E ÔNIBUS</option>
  </select>
</div>
<div class="form-group">
  <select id="marcas" class="form-control">
  </select>
</div>
<div class="form-group">
  <select id="modelos" class="form-control">
  </select>
 </div>
<div class="form-group">
  <select id="ano" class="form-control">
  </select>
</div>
<table class="table" id="veiculo" style="width: 100%">
</table>
<div style="text-align: center!important" id="btn_fipe">
<input type="button" value="Nova pesquisa" class="btn" id="btn_reset">
</div>
</form>
<?php
echo $args['after_widget'];
}
public function form( $instance ) {
if ( isset( $instance[ 'title' ] ) )
$title = $instance[ 'title' ];
else
$title = __( 'Default Title', 'cm_widget_fipe' );
?>
<p>
<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
</p>
<?php
}
public function update( $new_instance, $old_instance ) {
$instance = array();
$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
return $instance;
}

}
?>