{
	description = "Sibumi nix dev enviroment";

	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs/nixos-22.05";
	};

	outputs = inputs@{nixpkgs, ...}:
		let
			system = "x86_64-linux";
			pkgs = nixpkgs.legacyPackages.${system};
		in
		{
			devShell.x86_64-linux = pkgs.mkShell {
				buildInputs = with pkgs; [
					nodejs-16_x
          nodePackages.pm2
					nodePackages.typescript-language-server
          nodePackages.typescript
				];
			};
	};
}
