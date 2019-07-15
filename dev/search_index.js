var documenterSearchIndex = {"docs":
[{"location":"#DFTK.jl:-The-density-functional-toolkit.-1","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"","category":"section"},{"location":"#","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"DFTK is a julia package of for playing with plane-wave density-functional theory algorithms.","category":"page"},{"location":"#Terminology-and-Definitions-1","page":"DFTK.jl: The density-functional toolkit.","title":"Terminology and Definitions","text":"","category":"section"},{"location":"#","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"General terminology used throughout the documentation of the plane-wave aspects of the code.","category":"page"},{"location":"#Plane-wave-basis-functions-1","page":"DFTK.jl: The density-functional toolkit.","title":"Plane wave basis functions","text":"","category":"section"},{"location":"#","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"At the moment the code works exclusively with orthonormal plane waves. In other words our bases consist of functions","category":"page"},{"location":"#","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"e_G = 1sqrtOmega e^i G cdot x","category":"page"},{"location":"#","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"where Omega is the unit cell volume.","category":"page"},{"location":"#Basis-sets-1","page":"DFTK.jl: The density-functional toolkit.","title":"Basis sets","text":"","category":"section"},{"location":"#","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"The wave-function basis B_Ψk (used to be X_k), consisting of all plane-wave basis functions below the desired energy cutoff E_textcut for each k-point:\nB_Ψk =  e_G  12 G + k^2  E_textcut\nThe potential or density basis B_rho, consisting of all plane waves on which a potential needs to be known in order to be consistent with the union of all B_Ψk for all k. In practice we do not take the smallest possible set of wave vectors G for this, but instead the smallest cubic grid, which satisfies this, i.e.\nB_rho =  e_G  12 G_textmax^2  α E_textcut \nwhere a supersampling factor alpha = 4 is required to give a numerically exact result, since\nB_rho =  e_G+G  k e_G e_G  B_Ψk \nThe choice of using a cubic grid is done in order to be consistent with usual fast Fourier transform implementations, which work on cubic Fourier grids.\nThe XC basis B_textXC, which is used for computing the application of the exchange-correlation potential operator to the density rho, represented in the basis B_rho, that is\nB_textXC  = e_G  12 G_textmax^2  β E_textcut \nSince the exchange-correlation potential might involve arbitrary powers of the density ρ, a numerically exact computation of the integral\nlangle e_G  V_textXC(ρ) e_G rangle qquad textwith qquad e_G e_G  B_Ψk\nrequires the exchange-correlation supersampling factor beta to be infinite. In practice, beta =4 is usually chosen, such that B_textXC = B_rho.","category":"page"},{"location":"#Real-space-grids-1","page":"DFTK.jl: The density-functional toolkit.","title":"Real-space grids","text":"","category":"section"},{"location":"#","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"Due to the Fourier-duality of reciprocal-space and real-space lattice, the above basis sets define corresponding real-space grids as well:","category":"page"},{"location":"#","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"The grid B_rho^ast, the potential integration grid, which is the grid used for convolutions of a potential with the discretized representation of a DFT orbital. It is simply the iFFT-dual real-space grid of B_rho.\nThe grid B^ast_textXC, the exchange-correlation integration grid, i.e. the grid used for convolutions of the exchange-correlation functional terms with the density or derivatives of it. It is the iFFT-dual of B_textXC.","category":"page"},{"location":"#Core-1","page":"DFTK.jl: The density-functional toolkit.","title":"Core","text":"","category":"section"},{"location":"#","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"PlaneWaveBasis\nset_kpoints!\nbasis_ρ\nDFTK.G_to_r!\nDFTK.r_to_G!\nPotLocal\nPotNonLocal\nKinetic\nHamiltonian\napply_hamiltonian!\nDFTK.apply_fourier!\nDFTK.apply_real!\nDFTK.compute_potential!\nDFTK.empty_potential\nPreconditionerKinetic\nDFTK.lobpcg\nDFTK.lobpcg_qr\nDFTK.lobpcg_scipy\nDFTK.lobpcg_itsolve\nDFTK.occupation_zero_temperature\nself_consistent_field\nDFTK.scf_nlsolve\nDFTK.scf_damped\nPspHgh\neval_psp_projection_radial\neval_psp_local_real\neval_psp_local_fourier\ncompute_density","category":"page"},{"location":"#DFTK.PlaneWaveBasis","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.PlaneWaveBasis","text":"PlaneWaveBasis(lattice::Mat3{T}, grid_size::Vec3{I}, Ecut::Number, kpoints,\n               kweights) where {T <: Real, I <: Integer}\n\nCreate a plane-wave basis from a specification for the Fourier grid size and a kinetic energy cutoff to select the k-point-specific wave function basis B_Ψk in a way that the selected G wave vectors satisfy G + k^22 leq Ecut.\n\nExamples\n\njulia> b = PlaneWaveBasis(TODO)\n\nArguments\n\nlattice:       Real-space lattice vectors in columns\ngrid_size:     Size of the rectangular Fourier grid used as the                  density basis B_ρ. In each dimension idim the                  range of wave vectors (in integer coordinates) extends from                  -ceil(Int, (grid_size[idim]-1) / 2) up to                  floor(Int, (grid_size[idim]-1) / 2). No optimisation is done                  on the size of the grid with respect to performing FFTs.\nEcut:          Kinetic energy cutoff in Hartree\nkpoints:       List of k-Points in fractional coordinats\nkweights:      List of corresponding weights for the Brillouin-zone integration.\n\n\n\n\n\n","category":"type"},{"location":"#DFTK.set_kpoints!","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.set_kpoints!","text":"Reset the kpoints of an existing Plane-wave basis and change the basis accordingly.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.basis_ρ","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.basis_ρ","text":"Return a generator producing the range of wave-vector coordinates contained in the Fourier grid B_ρ described by the plane-wave basis.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.G_to_r!","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.G_to_r!","text":"G_to_r!(pw::PlaneWaveBasis, f_fourier, f_real[, basis_ρ])\n\nPerform an in-place FFT to translate between f_fourier, a fourier representation of a function using the wave vectors specified in basis_ρ and a representation on the real-space density grid B^_ρ. The function will destroy all data in f_real. If basis_ρ is absent, the full density grid B_ρ is used.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.r_to_G!","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.r_to_G!","text":"r_to_G!(pw::PlaneWaveBasis, f_real, f_fourier[, gcoords])\n\nPerform an in-place FFT to translate between f_real, a representation of a function on the real-space density grid B^_ρ and a fourier representation using the wave vectors specified in gcoords. If gcoords is less than the wave vectors required to exactly represent f_real, than this function implies a truncation. On call all data in f_real and f_fourier will be destroyed. If gcoords is absent, the full density grid B_ρ is used.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.PotLocal","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.PotLocal","text":"Class for holding the values of a local potential, like the local part of a pseudopotential\n\n\n\n\n\n","category":"type"},{"location":"#DFTK.PotNonLocal","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.PotNonLocal","text":"PotNonLocal(pw::PlaneWaveBasis, positions, psps)\n\nBuild a Kleinman-Bylander representation of the non-local potential term for the given basis. positions is a mapping from an identifier to a set of positions in fractional coordinates and psps is a mapping from the identifier to the pseudopotential object associated to this idendifier.\n\n\n\n\n\n","category":"type"},{"location":"#DFTK.Kinetic","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.Kinetic","text":"Kinetic energy operator in a plane-wave basis.\n\n\n\n\n\n","category":"type"},{"location":"#DFTK.Hamiltonian","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.Hamiltonian","text":"Hamiltonian(basis::PlaneWaveBasis; kinetic=Kinetic(basis), pot_local=nothing,\n            pot_nonlocal=nothing, pot_hartree=nothing, pot_xc=nothing)\n\nHamiltonian discretized in a plane-wave basis. Terms which are not specified (left as nothing) are ignored during application. If only a basis object is specified, a free-electron Hamiltonian is constructed. The kinetic pot_local and pot_nonlocal terms shall not contain a non-linearity in the density.\n\n\n\n\n\n","category":"type"},{"location":"#DFTK.apply_hamiltonian!","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.apply_hamiltonian!","text":"apply_hamiltonian!(out, ham, ik, pot_hartree_values, pot_xc_values, in)\n\nApply the ik-th k-Point block of a Hamiltonian using precomputed values for the non-linear Hartree and XC potential (in pot_hartree_values and pot_xc_values) on the real-space grid B_rho^ at the current density.\n\nFor this kinetic and pot_nonlocal are applied to in using apply_fourier!. The other terms are treated via a convolution on the density grid B_rho^, that is the procedure\n\n X_k --pad--> Y --IFFT--> Y* --V--> Y* --FFT--> Y --trunc--> X_k\n\nwhere\n\n  pad      Zero padding\n  FFT      fast-Fourier transform\n  IFFT     inverse fast-Fourier transform\n  trunc    Truncation to a smaller basis\n  V        Apply potential elementwise using `apply_real!`\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.apply_fourier!","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.apply_fourier!","text":"Apply a k-block of a Hamiltonian term in Fourier space\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.apply_real!","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.apply_real!","text":"Apply a Hamiltonian term by computation on the real-space density grid B^_ρ\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.compute_potential!","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.compute_potential!","text":"Compute the potential of a non-linear term (e.g. pot_hartree or pot_xc) on the real-space density grid B^_ρ, given a current density ρ in the density basis B_ρ. If the passed term is nothing, nothing is returned by the function as well, else an array of values.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.empty_potential","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.empty_potential","text":"Return an appropriately sized container for a potential term on the real-space grid B^_ρ\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.PreconditionerKinetic","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.PreconditionerKinetic","text":"Kinetic-energy based preconditioner.\n\nApplies 1  (k + G^2  2 + α) to the vectors, when called with ldiv!. This attempts to dampen the high-kinetic energy parts of the Hamiltonian, thus making the Hamiltonian more well-conditioned.\n\n\n\n\n\n","category":"type"},{"location":"#IterativeSolvers.lobpcg","page":"DFTK.jl: The density-functional toolkit.","title":"IterativeSolvers.lobpcg","text":"lobpcg(ham::Hamiltonian, pot_hartree_values, pot_xc_values, nev_per_kpoint::Int;\n       guess=nothing, prec=nothing, tol=1e-6, maxiter=100, backend=:lobpcg_qr,\n       kwargs...)\n\nRun the LOBPCG implementation from backend for each k-Point of the Hamiltonian ham, solving for the nev_per_kpoint smallest eigenvalues. Optionally a guess and a preconditioner prec can be used. pot_hartree_values and pot_xc_values are the precomputed values of the Hartee and XC term of the Hamiltonian on the grid B_ρ^. The backend parameters selects the LOBPCG implementation to use.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.lobpcg_qr","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.lobpcg_qr","text":"lobpcg_qr(A, X0; maxiter=100, prec=I, tol=20size(A,2)*eps(eltype(A)), largest=false)\n\nNaive LOBPCG for finding the largest eigenpairs of a Hermitian matrix A starting from a guess X0 of as many guess vectors as eigenpairs are sought. Optionally a preconditioner prec may be employed.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.lobpcg_scipy","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.lobpcg_scipy","text":"lobpcg_scipy(A, X0; prec=nothing, tol=nothing, largest=false, kwargs...)\n\nCall scipy's version of LOBPCG for finding the eigenpairs of a Hermitian matrix A. X0 is the set of guess vectors, also determining the number of eigenpairs to be sought.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.lobpcg_itsolve","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.lobpcg_itsolve","text":"lobpcg_itsolve(A, X0; prec=nothing, largest=false, kwargs...)\n\nCall the lobpcg version from the IterativeSolvers package passing through most arguments\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.occupation_zero_temperature","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.occupation_zero_temperature","text":"Compute the occupation at zero temperature and without smearing for n_elec electrons and the bands Psi with associated energies.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.self_consistent_field","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.self_consistent_field","text":"self_consistent_field(ham::Hamiltonian, n_bands::Int, n_electrons::Int;\n                      ρ=nothing, tol=1e-6, max_iter=100, algorithm=:scf_nlsolve,\n                      lobpcg_prec=PreconditionerKinetic(ham, α=0.1))\n\nRun a self-consistent field iteration for the Hamiltonian ham, returning the self-consistnet density, Hartree potential values and XC potential values. n_bands selects the number of bands to be computed, n_electrons the number of electrons, ρ is the initial density, e.g. constructed via a SAD guess. lobpcg_prec specifies the preconditioner used in the LOBPCG algorithms used for diagonalisation. Possible algorithms are :scf_nlsolve or :scf_damped.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.scf_nlsolve","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.scf_nlsolve","text":"TODO docme\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.scf_damped","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.scf_damped","text":"TODO docme\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.PspHgh","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.PspHgh","text":"PspHgh(Zion::Number, rloc::Number, cloc::Vector, rp::Vector, h::Vector;\n       identifier=\"\", description=\"\")\n\nConstruct a Hartwigsen, Goedecker, Teter, Hutter separable dual-space Gaussian pseudopotential (1998). The required parameters are the ionic charge Zion (total charge - valence electrons), the range for the local Gaussian charge distribution rloc, the coefficients for the local part cloc, the projector radius rp (one per AM channel) and the non-local coupling coefficients between the projectors h (one matrix per AM channel).\n\n\n\n\n\n","category":"type"},{"location":"#DFTK.eval_psp_projection_radial","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.eval_psp_projection_radial","text":"eval_psp_projection_radial(psp::PspHgh, i, l, qsq::Number)\n\nEvaluate the radial part of the i-th projector for angular momentum l at the reciprocal lattice point with modulus squared qsq. Compared to the expressions in the GTH and HGH papers, this expression misses a factor of 1/sqrt(Ω).\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.eval_psp_local_real","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.eval_psp_local_real","text":"eval_psp_local_real(psp, r)\n\nEvaluate the local part of the pseudopotential in real space. The vector r should be given in cartesian coordinates.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.eval_psp_local_fourier","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.eval_psp_local_fourier","text":"eval_psp_local_fourier\n\nEvaluate the local part of the pseudopotential in reciprocal space. Computes <eG|Vloc|e{G+ΔG}> without taking into account the structure factor and the (4π / Ω) spherical Hankel transform prefactor. ΔG should be in cartesian coordinates.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.compute_density","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.compute_density","text":"compute_density(pw::PlaneWaveBasis, Psi::AbstractVector, occupation::AbstractVector;\n                tolerance_orthonormality)\n\nCompute the density for a wave function Psi discretised on the plane-wave grid pw, where the individual k-Points are occupied according to occupation. Psi should be one coefficient matrix per k-Point. If tolerance_orthonormality is ≥ 0, some orthonormality properties are verified explicitly.\n\n\n\n\n\n","category":"function"},{"location":"#Utilities-1","page":"DFTK.jl: The density-functional toolkit.","title":"Utilities","text":"","category":"section"},{"location":"#","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.jl: The density-functional toolkit.","text":"determine_grid_size\nbuild_local_potential\nkblock_as_matrix\nload_psp\nguess_gaussian_sad\nguess_hcore","category":"page"},{"location":"#DFTK.determine_grid_size","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.determine_grid_size","text":"determine_grid_size(lattice, Ecut; kpoints=[[0,0,0]], supersampling=2)\n\nDetermine the minimal grid size for the density fourier grid B_ρ subject to the kinetic energy cutoff Ecut for the wave function and a density  supersampling factor.\n\nThe function will determine the union of wave vectors G required to satisfy G + k^22 leq E_textcut  textsupersampling^2 for all k-Points. The returned grid dimensions are the smallest cartesian box to incorporate these G.\n\nFor an exact representation of the density resulting from wave functions represented in the basis B_ρ = G  G + k^22 leq Ecut, supersampling should be at least 2.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.build_local_potential","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.build_local_potential","text":"build_local_potential(pw::PlaneWaveBasis, positions, generators;\n                      compensating_background=true)\n\nFunction generating a local potential on the real-space density grid B^_ρ defined by the plane-wave basis pw. The potential is generated by summing (in Fourier space) analytic contributions from all species involved in the lattice, followed by an iFFT. The lattice definition is taken implicitly from pw.\n\nThe contributions are defined by the two maps positions and generators. The former maps a set of keys, uniquely identifying the lattice species, to a list of fractional coordinates defining their real-space positions. The latter maps each identifier to a function G -> potential(G), which defines the potential value for this species at this reciprocal space position (also passed to this function in integer coordinates).   The parameter compensating_background (default true) determines whether the DC component will be automatically set to zero, which physically corresponds to including a compensating change background in the potential model.\n\nExamples\n\nGiven an appropriate lattice and basis definition in basis one may build the local potential for an all-electron treatment of sodium chloride as such\n\njulia> build_local_potential(basis,\n                             [:Na => [[0,0,0], [1/2,1/2,0], [1/2,0,1/2], [0,1/2,1/2]],\n                              :Cl => [[0,1/2,0], [1/2,0,0], [0,0,1/2], [1/2,1/2,1/2]]],\n                             [:Na => -11 / sum(abs2, basis.recip_lattice * G), :Cl => -17 / sum(abs2, recip_lattice * G)])\n\nsince sodium has nuclear charge 11 and chlorine charge 17.\n\nFor crystals composed of only a single species, such as silicon, one can drop the mappings:\n\njulia> build_local_potential(basis, [[0,0,0], [1/8, 1/8, 1/8]], G -> -12 / sum(abs2, basis.recip_lattice * G))\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.kblock_as_matrix","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.kblock_as_matrix","text":"Compute a k-Point block of an operator as a dense matrix\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.load_psp","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.load_psp","text":"load_psp(identifier; search_directory)\n\nLoad a pseudopotential file from the library of pseudopotentials. The file is searched in the directory search_directory and by the identifier.\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.guess_gaussian_sad","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.guess_gaussian_sad","text":"guess_gaussian_sad(basis, positions, Znucls, [Zions])\n\nBuild a superposition of atomic densities (SAD) guess density. The atoms/species are specified by the three dictionaries positions, Znucls and Zions. The first specifies the list of atom positions, Znucls is the corresponding nuclear charge and Zions the corresponding ionic charge (i.e. the charge left over when pseudopotentials have been taken into account).\n\n\n\n\n\n","category":"function"},{"location":"#DFTK.guess_hcore","page":"DFTK.jl: The density-functional toolkit.","title":"DFTK.guess_hcore","text":"Obtain a guess density form diagonalising the core Hamiltonian associated to ham, i.e. strip the non-linear parts. compute_occupation computes the occupation values, taking into account potential smearing. lobpcg_prec is a preconditioner for LOBPCG and n_bands the number of bands to compute.\n\n\n\n\n\n","category":"function"}]
}
