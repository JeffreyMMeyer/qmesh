Vagrant.configure("2") do |config|

	name = 'qmesh-box'
    
	config.vm.provider "virtualbox" do |v|
	  v.memory = 4096
	  v.cpus = 4
	end
    
    config.vm.define "ubuntu" do |ubuntu|
    
        ubuntu.vm.box = "trusty_daily"
        
        ubuntu.vm.network :forwarded_port, host: 8011, guest: 80 # Apache
        ubuntu.vm.network :forwarded_port, host: 9211, guest: 9200 # ElasticSearch
        ubuntu.vm.network :forwarded_port, host: 8111, guest: 81 # NGINX
        ubuntu.vm.network :forwarded_port, host: 5411, guest: 5432 # PostgreSQL
    
        ubuntu.vm.provision "shell", path: "sh/base_setup.sh"
        ubuntu.vm.provision "shell", path: "sh/elasticsearch.sh"
        ubuntu.vm.provision "shell", path: "sh/node.sh"
        ubuntu.vm.provision "shell", path: "sh/postgresql_setup.sh"
    end
    
    
end
