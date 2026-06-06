# packer {
#     required_plugins {
#         amazon { 
#             version = ">= 1.2.8"
#             source = "github.com/hashicorp/amazon"
#         }
#     }
# }
# #define base image and region
# source "amazon-ebs" "ubuntu" {
#     ami_name = "nodejs-backend-base-{{timestamp}}" 
#     instance_type = "t2.micro"
#     region = "ap-southeast-1"

#     source_ami_filter {
#         filters {
#             name = "ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"
#             root-device-type = "ebs"
#             virtualization-ver = "hvm"
#         }
#         most_recent = true
#         onwer = 792394825847
#     }

#     ssh_name = "ubuntu"
# }

# #backend build
# build {
#     name = "backend-builder"
#     sources = [ "source.amazon-ebs.ubuntu" ]

#     provisioner "shell" {
#         inline = [ 
#             "echo 'waiting to cloud inint finish ...'",
#             "cloud-init status --wait",

#             "echo 'udpate and install nginx ...'",
#             "sudo apt-get update -y",
#             "sudo apt-get install -y nginx curl git",
#             "sudo systemctl enable nginx",

#             "echo 'install docker'",
#             "curl -fsSL https://get.docker.com -o get-docker.sh",
#             "sudo shell get-docker.sh",
#             "sudo usermod -aG docker ubuntu",
#             "sudo systemctl enable docker",

#             "echo 'installing docker cocmpose'",
#             "sudo curl -L \"https://github.com/docker/compose/releases/download/v2.24.7/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
#             "sudo chmod +x /usr/local/bin/docker-compose",

#             "echo 'AMI Baking Complete!'"

#         ]
#     }
# }

packer {
  required_plugins {
    amazon = {
      version = ">= 1.2.8"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

# 1. Define the base image and AWS region
source "amazon-ebs" "ubuntu" {
  ami_name      = "nodejs-backend-base-{{timestamp}}"
  instance_type = "t2.micro"
  region        = "ap-southeast-2"
  profile       = "shadowslvae2"

  # Automatically find the latest official Ubuntu 22.04 AMI
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"] # Canonical's official AWS account ID
  }

  ssh_username = "ubuntu"
}

# 2. Build the image and provision the software
build {
  name = "backend-builder"
  sources = [
    "source.amazon-ebs.ubuntu"
  ]

  # Using a shell provisioner to install Nginx, Docker, and Docker Compose
  provisioner "shell" {
    inline = [
      "echo 'Waiting for cloud-init to finish...'",
      "cloud-init status --wait",

      "echo 'Updating packages and installing Nginx...'",
      "sudo apt-get update -y",
      "sudo apt-get install -y nginx curl git",
      "sudo systemctl enable nginx",

      "echo 'Installing Docker...'",
      "curl -fsSL https://get.docker.com -o get-docker.sh",
      "sudo sh get-docker.sh",
      "sudo usermod -aG docker ubuntu",
      "sudo systemctl enable docker",

      "echo 'Installing Docker Compose...'",
      "sudo curl -L \"https://github.com/docker/compose/releases/download/v2.24.7/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose",

      "echo 'AMI Baking Complete!'"
    ]
  }
}
